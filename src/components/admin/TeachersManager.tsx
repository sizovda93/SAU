import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Pencil, Trash2, Eye, EyeOff, Upload } from "lucide-react";
import { getTeachers, createTeacher, updateTeacher, toggleTeacherPublish, deleteTeacher as apiDeleteTeacher, uploadToPath, Teacher } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const FormLabel = ({ className = "", ...props }: any) => (
  <label
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    {...props}
  />
);

export function TeachersManager() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState("");

  const form = useForm({
    defaultValues: {
      full_name: "",
      position: "",
      bio: "",
      expertise: "",
      experience: "",
      photo_url: "",
      display_order: 0,
      is_published: true,
    },
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const { publicUrl } = await uploadToPath(file);
      setPhotoPreview(publicUrl);
      form.setValue("photo_url", publicUrl);
      toast({ title: "Успешно", description: "Фото загружено в PostgreSQL" });
    } catch (error: any) {
      toast({ title: "Ошибка загрузки", description: error.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const data = await getTeachers();
      setTeachers(data || []);
    } catch (error: any) {
      toast({ title: "Ошибка", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values: any) => {
    try {
      const submitData = {
        full_name: values.full_name,
        position: values.position || null,
        bio: values.bio || null,
        expertise: values.expertise || null,
        experience: values.experience || null,
        photo_url: values.photo_url || null,
        display_order: Number(values.display_order) || 0,
        is_published: Boolean(values.is_published),
      };

      if (editingId) {
        await updateTeacher(editingId, submitData);
        toast({ title: "Успешно", description: "Эксперт обновлен" });
      } else {
        await createTeacher(submitData);
        toast({ title: "Успешно", description: "Эксперт добавлен" });
      }

      form.reset();
      setPhotoPreview("");
      setOpen(false);
      setEditingId(null);
      await fetchTeachers();
    } catch (error: any) {
      toast({ title: "Ошибка", description: error.message, variant: "destructive" });
    }
  };

  const editTeacher = (teacher: Teacher) => {
    form.reset({
      full_name: teacher.full_name,
      position: teacher.position || "",
      bio: teacher.bio || "",
      expertise: teacher.expertise || "",
      experience: teacher.experience || "",
      photo_url: teacher.photo_url || "",
      display_order: teacher.display_order || 0,
      is_published: teacher.is_published,
    });
    setPhotoPreview(teacher.photo_url || "");
    setEditingId(teacher.id);
    setOpen(true);
  };

  const handleTogglePublish = async (id: number, current: boolean) => {
    try {
      await toggleTeacherPublish(id, !current);
      toast({ title: "Успешно", description: "Статус публикации изменен" });
      await fetchTeachers();
    } catch (error: any) {
      toast({ title: "Ошибка", description: error.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить эксперта?")) return;

    try {
      await apiDeleteTeacher(id);
      toast({ title: "Успешно", description: "Эксперт удален" });
      await fetchTeachers();
    } catch (error: any) {
      toast({ title: "Ошибка", description: error.message, variant: "destructive" });
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      form.reset();
      setPhotoPreview("");
      setEditingId(null);
    }
    setOpen(newOpen);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Эксперты ({teachers.length})</h2>
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingId(null)}>Добавить эксперта</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Редактировать эксперта" : "Добавить эксперта"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <FormLabel className="mb-2 block">Фото</FormLabel>
                {photoPreview ? (
                  <div className="space-y-2">
                    <img src={photoPreview} alt="Teacher" className="h-24 w-24 rounded-md bg-muted/30 p-1 object-contain" />
                    <Input type="file" accept="image/*" onChange={handlePhotoUpload} disabled={uploading} />
                  </div>
                ) : (
                  <div className="cursor-pointer rounded-lg border-2 border-dashed p-6 text-center hover:bg-gray-50">
                    <Input type="file" accept="image/*" onChange={handlePhotoUpload} disabled={uploading} className="hidden" id="teacher-photo-input" />
                    <label htmlFor="teacher-photo-input" className="block cursor-pointer">
                      <Upload className="mx-auto mb-2 text-gray-400" size={24} />
                      <p className="text-sm">Нажми или перетащи фото</p>
                      {uploading && <p className="mt-2 text-xs text-blue-500">Загрузка...</p>}
                    </label>
                  </div>
                )}
              </div>

              <div>
                <FormLabel className="mb-2 block">ФИО</FormLabel>
                <Input {...form.register("full_name")} placeholder="Иванов Иван Иванович" />
              </div>

              <div>
                <FormLabel className="mb-2 block">Должность / роль</FormLabel>
                <Input {...form.register("position")} placeholder="Арбитражный управляющий" />
              </div>

              <div>
                <FormLabel className="mb-2 block">Краткое описание</FormLabel>
                <Textarea {...form.register("bio")} placeholder="Краткий абзац об эксперте" />
              </div>

              <div>
                <FormLabel className="mb-2 block">Экспертиза</FormLabel>
                <Textarea {...form.register("expertise")} placeholder="Банкротство, корпоративное право..." />
              </div>

              <div>
                <FormLabel className="mb-2 block">Опыт</FormLabel>
                <Textarea {...form.register("experience")} placeholder="15 лет в сфере банкротства..." />
              </div>

              <div>
                <FormLabel className="mb-2 block">Порядок отображения</FormLabel>
                <Input type="number" {...form.register("display_order", { valueAsNumber: true })} placeholder="0" />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" {...form.register("is_published")} id="teacher_is_published" className="cursor-pointer" />
                <FormLabel htmlFor="teacher_is_published" className="cursor-pointer">
                  Опубликовать на сайте
                </FormLabel>
              </div>

              <Button type="submit" className="w-full">
                {editingId ? "Сохранить изменения" : "Добавить эксперта"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {teachers.length === 0 ? (
            <p className="text-gray-500">Экспертов пока нет</p>
          ) : (
            teachers.map((teacher) => (
              <div key={teacher.id} className="rounded-lg border p-4 transition hover:shadow-md">
                <div className="flex gap-4">
                  {teacher.photo_url ? (
                    <img
                      src={teacher.photo_url}
                      alt={teacher.full_name}
                      className="h-16 w-16 flex-shrink-0 rounded-md bg-muted/30 p-1 object-contain"
                    />
                  ) : (
                    <div className="h-16 w-16 flex-shrink-0 rounded-md bg-gray-200" />
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="truncate text-lg font-bold">{teacher.full_name}</h3>
                        {teacher.position && <p className="text-sm text-gray-600">{teacher.position}</p>}
                        <p className="mt-1 text-xs text-gray-500">Порядок: {teacher.display_order ?? 0}</p>
                      </div>
                      <div className="flex flex-shrink-0 gap-2">
                        <Button variant="outline" size="sm" onClick={() => editTeacher(teacher)}>
                          <Pencil size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleTogglePublish(teacher.id, teacher.is_published)}>
                          {teacher.is_published ? <Eye size={16} /> : <EyeOff size={16} />}
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(teacher.id)}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>

                    {teacher.bio && <p className="mt-3 text-sm text-gray-700">{teacher.bio}</p>}
                    {teacher.expertise && <p className="mt-2 text-sm text-gray-700"><b>Экспертиза:</b> {teacher.expertise}</p>}
                    {teacher.experience && <p className="mt-2 text-sm text-gray-700"><b>Опыт:</b> {teacher.experience}</p>}

                    <p className="mt-3 text-xs text-gray-500">{teacher.is_published ? "Опубликован" : "Скрыт"}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

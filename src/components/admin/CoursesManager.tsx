import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Pencil, Trash2, Upload } from "lucide-react";
import { getCourses, createCourse, updateCourse, deleteCourse as apiDeleteCourse, uploadToPath, Course } from "@/lib/api";
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

export function CoursesManager() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [coverPreview, setCoverPreview] = useState("");

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      benefits: "",
      cover_image_url: "",
      price: 0,
      level: "Базовый",
    },
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const { publicUrl } = await uploadToPath(file);
      setCoverPreview(publicUrl);
      form.setValue("cover_image_url", publicUrl);
      toast({ title: "Успешно", description: "Обложка загружена в PostgreSQL" });
    } catch (error: any) {
      toast({ title: "Ошибка загрузки", description: error.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await getCourses();
      setCourses(data || []);
    } catch (error: any) {
      toast({ title: "Ошибка", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values: any) => {
    try {
      const submitData = {
        title: values.title,
        description: values.description || null,
        benefits: values.benefits || null,
        cover_image_url: values.cover_image_url || null,
        price: Number(values.price) || 0,
        level: values.level || null,
      };

      if (editingId) {
        await updateCourse(editingId, submitData);
        toast({ title: "Успешно", description: "Модуль обновлен" });
      } else {
        await createCourse(submitData);
        toast({ title: "Успешно", description: "Модуль создан" });
      }

      form.reset();
      setCoverPreview("");
      setOpen(false);
      setEditingId(null);
      await fetchCourses();
    } catch (error: any) {
      toast({ title: "Ошибка", description: error.message, variant: "destructive" });
    }
  };

  const editCourse = (course: Course) => {
    form.reset({
      title: course.title,
      description: course.description || "",
      benefits: course.benefits || "",
      cover_image_url: course.cover_image_url || "",
      price: course.price,
      level: course.level || "",
    });
    setCoverPreview(course.cover_image_url || "");
    setEditingId(course.id);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Вы уверены?")) return;

    try {
      await apiDeleteCourse(id);
      toast({ title: "Успешно", description: "Модуль удален" });
      await fetchCourses();
    } catch (error: any) {
      toast({ title: "Ошибка", description: error.message, variant: "destructive" });
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      form.reset();
      setCoverPreview("");
      setEditingId(null);
    }
    setOpen(newOpen);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Модули ({courses.length})</h2>
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingId(null)}>Добавить модуль</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Редактировать модуль" : "Добавить модуль"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <FormLabel className="mb-2 block">Обложка модуля</FormLabel>
                {coverPreview ? (
                  <div className="space-y-2">
                    <img src={coverPreview} alt="Cover" className="h-40 w-full rounded-lg object-cover" />
                    <Input type="file" accept="image/*" onChange={handleCoverUpload} disabled={uploading} />
                  </div>
                ) : (
                  <div className="cursor-pointer rounded-lg border-2 border-dashed p-6 text-center hover:bg-gray-50">
                    <Input type="file" accept="image/*" onChange={handleCoverUpload} disabled={uploading} className="hidden" id="cover-input" />
                    <label htmlFor="cover-input" className="block cursor-pointer">
                      <Upload className="mx-auto mb-2 text-gray-400" size={24} />
                      <p className="text-sm">Нажми или перетащи обложку</p>
                      {uploading && <p className="mt-2 text-xs text-blue-500">Загрузка...</p>}
                    </label>
                  </div>
                )}
              </div>

              <div>
                <FormLabel className="mb-2 block">Название</FormLabel>
                <Input {...form.register("title")} placeholder="Название модуля" />
              </div>

              <div>
                <FormLabel className="mb-2 block">Описание</FormLabel>
                <Textarea {...form.register("description")} placeholder="Описание модуля" />
              </div>

              <div>
                <FormLabel className="mb-2 block">Преимущества</FormLabel>
                <Textarea
                  {...form.register("benefits")}
                  placeholder="Каждый пункт с новой строки"
                />
              </div>

              <div>
                <FormLabel className="mb-2 block">Цена (₽)</FormLabel>
                <Input type="number" step="0.01" {...form.register("price", { valueAsNumber: true })} placeholder="0" />
              </div>

              <div>
                <FormLabel className="mb-2 block">Уровень</FormLabel>
                <Input {...form.register("level")} placeholder="Базовый / Продвинутый" />
              </div>

              <Button type="submit" className="w-full">
                Сохранить
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {courses.map((course) => (
            <div key={course.id} className="overflow-hidden rounded-lg border transition hover:shadow-lg">
              {course.cover_image_url && (
                <img src={course.cover_image_url} alt={course.title} className="h-40 w-full object-cover" />
              )}
              <div className="p-4">
                <h3 className="mb-2 line-clamp-2 text-lg font-bold">{course.title}</h3>
                <p className="mb-2 line-clamp-2 text-sm text-gray-600">{course.description}</p>
                <div className="mb-4 flex flex-wrap justify-between gap-2 text-sm">
                  <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">💰 {course.price} ₽</span>
                  <span className="rounded bg-purple-100 px-2 py-1 text-xs text-purple-800">📊 {course.level}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => editCourse(course)} className="flex-1">
                    <Pencil size={16} className="mr-1" />
                    Редактировать
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(course.id)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

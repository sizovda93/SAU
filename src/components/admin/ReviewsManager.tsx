import { useState, useEffect } from "react";
import { getReviews, getCourses, createReview, updateReview, toggleReviewPublish, deleteReview as apiDeleteReview, Review, Course } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Trash2, Eye, EyeOff, Pencil } from "lucide-react";

const FormLabel = ({ className = "", ...props }: any) => (
  <label
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    {...props}
  />
);

export function ReviewsManager() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const form = useForm({
    defaultValues: {
      author_name: "",
      rating: "5",
      comment: "",
      author_avatar_url: "",
      course_id: "",
      is_published: true,
    },
  });

  useEffect(() => {
    fetchReviews();
    fetchCourses();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await getReviews();
      setReviews(data || []);
    } catch (error: any) {
      toast({ title: "Ошибка", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data || []);
    } catch (error: any) {
      toast({ title: "Ошибка загрузки модулей", description: error.message, variant: "destructive" });
    }
  };

  const onSubmit = async (values: any) => {
    try {
      const submitData = {
        author_name: values.author_name,
        rating: parseInt(values.rating, 10),
        comment: values.comment,
        author_avatar_url: values.author_avatar_url || null,
        course_id: values.course_id ? parseInt(values.course_id, 10) : null,
        is_published: values.is_published,
      };

      if (editingId) {
        await updateReview(editingId, submitData);
        toast({ title: "Успешно", description: "Отзыв обновлен" });
      } else {
        await createReview(submitData);
        toast({ title: "Успешно", description: "Отзыв добавлен" });
      }

      form.reset();
      setOpen(false);
      setEditingId(null);
      await fetchReviews();
    } catch (error: any) {
      toast({ title: "Ошибка", description: error.message, variant: "destructive" });
    }
  };

  const editReview = (review: Review) => {
    form.reset({
      author_name: review.author_name,
      rating: review.rating.toString(),
      comment: review.comment || "",
      author_avatar_url: review.author_avatar_url || "",
      course_id: review.course_id ? review.course_id.toString() : "",
      is_published: review.is_published,
    });
    setEditingId(review.id);
    setOpen(true);
  };

  const handleTogglePublish = async (id: number, current: boolean) => {
    try {
      await toggleReviewPublish(id, !current);
      toast({ title: "Успешно", description: "Статус публикации изменен" });
      await fetchReviews();
    } catch (error: any) {
      toast({ title: "Ошибка", description: error.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить этот отзыв?")) return;

    try {
      await apiDeleteReview(id);
      toast({ title: "Успешно", description: "Отзыв удален" });
      await fetchReviews();
    } catch (error: any) {
      toast({ title: "Ошибка", description: error.message, variant: "destructive" });
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      form.reset();
      setEditingId(null);
    }
    setOpen(newOpen);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Отзывы ({reviews.length})</h2>
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button>Добавить отзыв</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Редактировать отзыв" : "Добавить отзыв"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <FormLabel>Имя автора</FormLabel>
                <Input {...form.register("author_name")} placeholder="Иванов Иван" />
              </div>

              <div className="space-y-2">
                <FormLabel>Модуль (необязательно)</FormLabel>
                <select {...form.register("course_id")} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="">Не привязан к модулю</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <FormLabel>Рейтинг (1-5)</FormLabel>
                <Input type="number" min="1" max="5" {...form.register("rating")} />
              </div>

              <div className="space-y-2">
                <FormLabel>Текст отзыва</FormLabel>
                <Textarea {...form.register("comment")} placeholder="Отличная система..." rows={4} />
              </div>

              <div className="space-y-2">
                <FormLabel>URL аватара</FormLabel>
                <Input {...form.register("author_avatar_url")} placeholder="https://..." />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" {...form.register("is_published")} id="is_published" className="cursor-pointer" />
                <FormLabel htmlFor="is_published" className="cursor-pointer">
                  Опубликовать сейчас
                </FormLabel>
              </div>

              <Button type="submit" className="w-full">
                {editingId ? "Обновить" : "Добавить"} отзыв
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <div className="space-y-3">
          {reviews.length === 0 ? (
            <p className="text-gray-500">Отзывов нет</p>
          ) : (
            reviews.map((review) => {
              const course = courses.find((c) => c.id === review.course_id);
              return (
                <div key={review.id} className="border rounded-lg p-4 flex gap-4">
                  {review.author_avatar_url && (
                    <img
                      src={review.author_avatar_url}
                      alt={review.author_name}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <div className="min-w-0">
                        <h4 className="font-bold">{review.author_name}</h4>
                        <p className="text-sm text-yellow-500">★ {review.rating}/5</p>
                        {course && <p className="text-xs text-gray-500">Модуль: {course.title}</p>}
                      </div>

                      <div className="flex gap-2 flex-shrink-0">
                        <Button variant="outline" size="sm" onClick={() => editReview(review)}>
                          <Pencil size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleTogglePublish(review.id, review.is_published)}>
                          {review.is_published ? <Eye size={16} /> : <EyeOff size={16} />}
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(review.id)}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 break-words">{review.comment}</p>
                    <p className="text-xs text-gray-500 mt-2">{review.is_published ? "Опубликован" : "Скрыт"}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

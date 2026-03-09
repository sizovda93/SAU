import { useEffect, useMemo, useState } from "react";
import { getLeads, Lead } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";

const sourceLabels: Record<string, string> = {
  website: "Сайт",
  hero_free_trial: "Попробовать бесплатно",
};

export function LeadsManager() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const data = await getLeads();
      setLeads(data || []);
    } catch (error: any) {
      toast({ title: "Ошибка", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const filteredLeads = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter((lead) => {
      return (
        lead.full_name.toLowerCase().includes(q) ||
        (lead.phone || "").toLowerCase().includes(q) ||
        (lead.email || "").toLowerCase().includes(q) ||
        (lead.promo_code || "").toLowerCase().includes(q) ||
        (sourceLabels[lead.source] || lead.source || "").toLowerCase().includes(q)
      );
    });
  }, [leads, searchQuery]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Заявки ({filteredLeads.length})</h2>
          <p className="text-sm text-muted-foreground">
            Здесь хранятся все заявки с сайта, включая форму из кнопки «Попробовать бесплатно».
          </p>
        </div>
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск: имя, телефон, email, промокод, источник"
          className="lg:max-w-md"
        />
      </div>

      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Дата</TableHead>
                <TableHead>Источник</TableHead>
                <TableHead>Имя</TableHead>
                <TableHead>Телефон</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Промокод</TableHead>
                <TableHead>Согласие</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    Заявок пока нет
                  </TableCell>
                </TableRow>
              ) : (
                filteredLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>{new Date(lead.created_at).toLocaleString("ru-RU")}</TableCell>
                    <TableCell>
                      <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-vivid">
                        {sourceLabels[lead.source] || lead.source}
                      </span>
                    </TableCell>
                    <TableCell>{lead.full_name}</TableCell>
                    <TableCell>{lead.phone || "-"}</TableCell>
                    <TableCell>{lead.email || "-"}</TableCell>
                    <TableCell>{lead.promo_code || "-"}</TableCell>
                    <TableCell>{lead.consent_policy ? "Да" : "Нет"}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

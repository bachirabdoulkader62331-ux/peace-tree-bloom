import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FRUITS, treeStage, type FruitId } from "@/lib/fruits";

export interface LiveStats {
  participants: number;
  actions: number;
  fruitCount: number;
  regionsActive: number;
  fruitBreakdown: Record<FruitId, number>;
  regionBreakdown: Record<string, number>;
  genderBreakdown: Record<string, number>;
  latest: Array<{
    id: string;
    first_name: string;
    region: string;
    fruits: string[];
    testimony: string | null;
    created_at: string;
  }>;
}

const EMPTY_FRUIT: Record<FruitId, number> = Object.fromEntries(
  FRUITS.map((f) => [f.id, 0]),
) as Record<FruitId, number>;

export function useLiveStats() {
  const [stats, setStats] = useState<LiveStats>({
    participants: 0,
    actions: 0,
    fruitCount: 0,
    regionsActive: 0,
    fruitBreakdown: { ...EMPTY_FRUIT },
    regionBreakdown: {},
    genderBreakdown: {},
    latest: [],
  });
  const [loading, setLoading] = useState(true);

  const refetch = async () => {
    const { data, error } = await (supabase as any)
      .from("engagements_public")
      .select("id, first_name, region, fruits, valeurs, paix_actions, gender, testimony, created_at")
      .order("created_at", { ascending: false });

    if (error || !data) {
      setLoading(false);
      return;
    }

    const fruitBreakdown: Record<FruitId, number> = { ...EMPTY_FRUIT };
    const regionBreakdown: Record<string, number> = {};
    const genderBreakdown: Record<string, number> = {};
    let actions = 0;
    let fruitCount = 0;

    for (const row of data) {
      const rowFruits = (row.fruits ?? []) as string[];
      for (const f of rowFruits) {
        if (f in fruitBreakdown) fruitBreakdown[f as FruitId] += 1;
        fruitCount += 1;
      }
      actions += (row.paix_actions?.length ?? 0) + (row.valeurs?.length ?? 0);
      if (row.region) regionBreakdown[row.region] = (regionBreakdown[row.region] ?? 0) + 1;
      if (row.gender) genderBreakdown[row.gender] = (genderBreakdown[row.gender] ?? 0) + 1;
    }

    setStats({
      participants: data.length,
      actions,
      fruitCount,
      regionsActive: Object.keys(regionBreakdown).length,
      fruitBreakdown,
      regionBreakdown,
      genderBreakdown,
      latest: data.slice(0, 6).map((r: any) => ({
        id: r.id,
        first_name: r.first_name,
        region: r.region,
        fruits: (r.fruits ?? []) as string[],
        testimony: r.testimony,
        created_at: r.created_at,
      })),
    });
    setLoading(false);
  };

  useEffect(() => {
    refetch();
    const channel = supabase
      .channel("engagements-live")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "engagements" },
        () => refetch(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { stats, loading, treeStage: treeStage(stats.participants) };
}

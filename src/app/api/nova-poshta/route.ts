import { NextRequest, NextResponse } from "next/server";

const NOVA_POSHTA_API_URL = "https://api.novaposhta.ua/v2.0/json/";

type NovaPoshtaResponse<T> = {
  success: boolean;
  errors?: string[];
  data?: T[];
};

type SettlementAddress = {
  Present: string;
  Warehouses: number;
  MainDescription: string;
  Area: string;
  DeliveryCity: string;
};

type SettlementResult = {
  Addresses: SettlementAddress[];
};

type WarehouseItem = {
  Ref: string;
  Description: string;
};

async function fetchNovaPoshta<T>(
  calledMethod: string,
  methodProperties: Record<string, string>,
) {
  const apiKey = process.env.NOVA_POSHTA_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Не задано NOVA_POSHTA_API_KEY. Додайте його в .env.local",
    );
  }

  const response = await fetch(NOVA_POSHTA_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      apiKey,
      modelName: "Address",
      calledMethod,
      methodProperties,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const responseText = await response.text().catch(() => "");

    throw new Error(
      responseText
        ? `Нова пошта повернула помилку ${response.status}: ${responseText}`
        : `Нова пошта повернула помилку ${response.status}`,
    );
  }

  const payload = (await response.json()) as NovaPoshtaResponse<T>;

  if (!payload.success) {
    throw new Error(payload.errors?.[0] || "Помилка відповіді Нової пошти");
  }

  return payload.data ?? [];
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type");
  const query = searchParams.get("query")?.trim() ?? "";

  try {
    if (type === "settlements") {
      if (query.length < 2) {
        return NextResponse.json({ success: true, items: [] });
      }

      const response = await fetchNovaPoshta<SettlementResult>(
        "searchSettlements",
        {
          CityName: query,
          Limit: "10",
        },
      );

      const items = (response[0]?.Addresses ?? [])
        .filter((item) => item.Warehouses > 0)
        .map((item) => ({
          ref: item.DeliveryCity,
          present: item.Present,
          mainDescription: item.MainDescription,
          area: item.Area,
        }));

      return NextResponse.json({ success: true, items });
    }

    if (type === "warehouses") {
      const cityRef = searchParams.get("cityRef")?.trim();

      if (!cityRef) {
        return NextResponse.json(
          { success: false, error: "Не передано місто для пошуку відділень" },
          { status: 400 },
        );
      }

      const warehouses = await fetchNovaPoshta<WarehouseItem>("getWarehouses", {
        CityRef: cityRef,
        FindByString: query,
        Limit: "20",
        Language: "UA",
      });

      const items = warehouses.map((item) => ({
        ref: item.Ref,
        description: item.Description,
      }));

      return NextResponse.json({ success: true, items });
    }

    return NextResponse.json(
      { success: false, error: "Невідомий тип запиту" },
      { status: 400 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Невідома помилка сервера",
      },
      { status: 500 },
    );
  }
}

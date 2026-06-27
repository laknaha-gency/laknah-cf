export const runtime = "edge";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");
    if (!key) return Response.json({ error: "missing key" }, { status: 400 });

    const kv = process.env.KV;
    if (!kv) return Response.json({ error: "KV not bound" }, { status: 500 });

    const value = await kv.get(key);
    return Response.json({ value: value ? JSON.parse(value) : null });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { key, value } = await request.json();
    if (!key) return Response.json({ error: "missing key" }, { status: 400 });

    const kv = process.env.KV;
    if (!kv) return Response.json({ error: "KV not bound" }, { status: 500 });

    await kv.put(key, JSON.stringify(value));
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

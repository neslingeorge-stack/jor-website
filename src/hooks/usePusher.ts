"use client";

import { useEffect, useRef } from "react";
import { getPusherClient } from "@/lib/pusher-client";

export function usePusherChannel(
  channel: string,
  event: string,
  handler: (data: unknown) => void
) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const client = getPusherClient();
    const ch = client.subscribe(channel);
    ch.bind(event, (data: unknown) => handlerRef.current(data));
    return () => {
      ch.unbind(event);
      client.unsubscribe(channel);
    };
  }, [channel, event]);
}

"use client";

import { useEffect, useRef } from "react";
import { getPusherClient } from "@/lib/pusher-client";

export function usePusherChannel(
  channel: string,
  event: string,
  handler: (data: unknown) => void
) {
  const handlerRef = useRef(handler);

  // Keep the latest handler in a ref without re-subscribing. Writing to the
  // ref inside an effect (rather than during render) avoids accessing the ref
  // during render, which React flags as it can desync from the committed UI.
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

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

import { useEffect } from 'react';
import { AddEventListenerOptions } from 'undici-types/patch';

export function useEventListener(eventName: string, handler : (event:Event) => void, element : EventTarget | undefined | null, options: AddEventListenerOptions = {} ) {
  useEffect(() => {
    if(element === undefined || element === null) return;
    const eventHandler = (event: Event) => {
      if (!options.passive) {
        event.preventDefault();
      }
      handler(event);
    };

    element.addEventListener(eventName, eventHandler, options);

    return () => {
      element.removeEventListener(eventName, eventHandler);
    };
  }, [eventName, handler, element, options]);
}

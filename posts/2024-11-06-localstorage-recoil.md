# Persisting State to localStorage in Recoil Across Browser Tabs

I was working on a project using Recoil for state management in React. 

I needed to persist some state to localStorage, and there’s some [info on how to do it in Recoil’s docs](https://recoiljs.org/docs/guides/atom-effects#local-storage-persistence).

That works; however it doesn’t respond to state changes from other instances of your app in multiple browser tabs.

If you want that, you have to add the code yourself by leveraging [the storage event](https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event).

Or, you can just copy the code I made to do it.

```ts
import { AtomEffect } from 'recoil';

/**
 * Given a specific key, this effect will sync the value of the atom into localStorage
 * and react to changes to that localStorage value across other tabs/windows.
 *
 * @param key - The key used in localStorage
 */
export const localStorageEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet, resetSelf }) => {
    // On load, if there's a value in localStorage, set the atom
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    // Subscribe to changes in the atom and update localStorage
    onSet((newValue, _, isReset) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
    });

    // When the value changes in localstorage (from another tab), update the atom
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        if (event.newValue === null) {
          resetSelf();
        } else {
          const newValue = JSON.parse(event.newValue);
          setSelf(newValue);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  };
```

Usage:

```ts
const myAtom = atom({
  key: 'myAtom',
  default: 1,
  effects: [
    localStorageEffect('my-atom-local-storage-key'),
  ]
});
```

Happy coding!
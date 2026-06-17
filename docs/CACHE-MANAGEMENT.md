# Cache Management Quick Reference

## Browser Console Commands

To use these commands in your browser's developer console (F12 → Console):

### Clear All Data (Start Fresh)
```javascript
// WARNING: This logs you out and clears all data!
await import('@athlehub/shared').then(m => m.clearAllCaches());
```

### Clear Only Profiles
```javascript
await import('@athlehub/shared').then(m => m.clearProfileCache());
```

### Clear Only Auth
```javascript
await import('@athlehub/shared').then(m => m.clearAuthCache());
```

### View Current Cache
```javascript
await import('@athlehub/shared').then(m => m.debugCacheContents());
```

### Full Reset (page reload included)
```javascript
// WARNING: Page will reload!
await import('@athlehub/shared').then(m => m.resetApplicationToDefaults());
```

---

## In React Components

```typescript
import { clearAllCaches, debugCacheContents } from '@athlehub/shared';

export function AdminPanel() {
  const handleClearCache = () => {
    if (confirm('Clear all caches? This will log you out.')) {
      clearAllCaches();
      // Optionally reload or redirect
      window.location.href = '/login';
    }
  };

  const handleDebug = () => {
    debugCacheContents();
  };

  return (
    <div>
      <button onClick={handleClearCache}>Clear All Caches</button>
      <button onClick={handleDebug}>Debug Cache (see console)</button>
    </div>
  );
}
```

---

## Storage Keys to Know

### Profile Data
- `athlehub_profile_user_001` (profile for user)
- `athlehub_username_index_alex_brooks` (username lookup)
- `athlehub_all_profiles` (profile list)

### Auth Data
- `athlehub_auth_user` (currently logged-in user)

---

## Troubleshooting

### "Data not clearing"
- Make sure you're on the app domain (not different origin)
- Check that localStorage isn't blocked
- Try viewing in incognito/private mode

### "Cache utilities not found"
- Make sure you've imported from `@athlehub/shared`
- Check that the package is built

### "Still seeing old profiles"
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R)
- Try in incognito mode
- Check sessionStorage too

---

## Manual Clearing in DevTools

1. Open DevTools (F12)
2. Go to "Application" tab
3. Find "Local Storage"
4. Click your domain
5. Select and delete entries starting with:
   - `athlehub_profile_`
   - `athlehub_username_index_`
   - `athlehub_all_profiles`
   - `athlehub_auth_user`

Or use DevTools console:
```javascript
// Clear all athlehub data
Object.keys(localStorage)
  .filter(k => k.startsWith('athlehub_'))
  .forEach(k => localStorage.removeItem(k));
```

---

**Last Updated:** February 21, 2026

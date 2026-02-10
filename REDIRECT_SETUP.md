# Auto-Redirect Setup for Authenticated Users

## Overview
When a logged-in user visits `localhost:3000` (root `/`), they are now automatically redirected to the home page (`/landingpage`).

## What Changed

### Updated: `pages/index.vue`
- Changed from using `useUser()` to `useAuth()` composable
- Updated redirect destination from `/dashboard/portfolio` to `/landingpage`
- Fixed template to use `isAuthenticated` as a computed property (not a function)
- Added `replace: true` option to prevent back button issues

## How It Works

### For Non-Authenticated Users
1. Visit `localhost:3000`
2. See the landing page with:
   - Hero section "Transform Your Digital Vision"
   - Features showcase
   - Call-to-action buttons (Get Started, Sign In)

### For Authenticated Users
1. Visit `localhost:3000`
2. See loading spinner with "Redirecting to home page..."
3. Automatically redirected to `/landingpage`
4. Can access portfolio, dashboard, and all authenticated features from there

## User Flow

```
User visits localhost:3000
         ↓
Is user authenticated? (Check token)
         ↓
    ┌────┴────┐
    NO        YES
    ↓          ↓
Show public   Redirect to
landing page  /landingpage
with login    (authenticated
& register    home page)
buttons
```

## Technical Details

### Authentication Check
```javascript
const { isAuthenticated } = useAuth()
```

### Redirect Logic
```javascript
onMounted(() => {
  if (isAuthenticated.value) {
    navigateTo('/landingpage', { replace: true })
  }
})
```

### Template Logic
```vue
<div v-if="!isAuthenticated">
  <!-- Show public landing page -->
</div>
<div v-else>
  <!-- Show loading + redirect -->
</div>
```

## Benefits

1. **Better UX**: Logged-in users immediately see relevant content
2. **No Confusion**: Public landing page only shown to non-logged-in users
3. **Clean Navigation**: No back button loop (using `replace: true`)
4. **Consistent Behavior**: Matches expected behavior when users are logged in

## Testing

### Test Case 1: Not Logged In
1. Clear cookies (or use incognito)
2. Go to `localhost:3000`
3. ✅ Should see public landing page with login/register buttons

### Test Case 2: Logged In
1. Login to the system
2. Go to `localhost:3000`
3. ✅ Should see "Redirecting..." then be taken to `/landingpage`

### Test Case 3: Direct Link While Logged In
1. Be logged in
2. Type `localhost:3000` in address bar
3. ✅ Should immediately redirect to `/landingpage`

### Test Case 4: Back Button
1. Be logged in, visit `localhost:3000` (redirects to `/landingpage`)
2. Navigate to another page (e.g., `/dashboard/portfolio`)
3. Click browser back button
4. ✅ Should go back to `/landingpage` (not `/`)

## Related Files
- ✅ `pages/index.vue` - Main redirect logic
- ✅ `composables/useAuth.ts` - Authentication state
- ✅ `pages/landingpage.vue` - Home page for authenticated users
- ✅ `components/Navbar.vue` - Navigation with proper links

## Redirect Destinations

| User State | From | To | Reason |
|-----------|------|-----|--------|
| Logged In | `/` | `/landingpage` | Show authenticated home |
| Not Logged In | `/` | Stays at `/` | Show public landing |
| No Cookie Consent | Any | Cookie popup shows | Must accept to login |

## Future Enhancements
- Could add different redirects based on user role:
  - Admin → `/dashboard/teacher-confirmations`
  - Teacher → `/dashboard/company-approvals`
  - Student → `/landingpage` (current)
- Could remember last visited page and redirect there
- Could add onboarding tour for first-time users


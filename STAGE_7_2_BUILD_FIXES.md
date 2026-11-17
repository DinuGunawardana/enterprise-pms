STAGE 7.2 — BUILD TYPE FIXES

Applied fixes based on the TypeScript errors reported by the user:
1. CalendarClient.tsx: replaced unsupported Button `block` prop with `className="w-full"`.
2. DocumentsClient.tsx: corrected the crypto UUID call from the nonexistent globalThis.createDocumentId() to globalThis.crypto.randomUUID(). The existing fallback remains for contexts without crypto.randomUUID.
3. TeamClient.tsx: explicitly typed the employee form state as Omit<Employee, "id"> so skills and projectIds are string[] rather than never[].

After extracting, run `npm install` and `npm run build`. This package has not been executed in the user's local environment; verify the build there.

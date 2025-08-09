export const isAdmin = async (email) => {
  const adminEmails = ["admin@sggs.ac.in"];  // ✅ Add Admin Emails
  return adminEmails.includes(email);
};

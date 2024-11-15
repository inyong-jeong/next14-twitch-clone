import { currentUser } from "@clerk/nextjs";

import { db } from "@/lib/db";

export const getSelf = async () => {
  const self = await currentUser();

  if (!self || !self.id) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { externalUserId: self.id },
  });

  if (!user) {
    throw new Error("Not found");
  }

  return user;
};

export const getSelfByUsername = async (id: string) => {
  const self = await currentUser();
  console.log('id : ', id)
  console.log('self : ', self)
  if (!self || !self.id) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { id }
  });

  console.log('prisma user :', user)

  if (!user) {
    throw new Error("User not found");
  }

  if (self.id !== user.id) {
    throw new Error("Unauthorized");
  }

  return user;
};

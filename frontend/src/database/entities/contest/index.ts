import prisma from "@/database/client";

const getAllContests = async () => {
  const allContests = await prisma.contest.findMany();
  return allContests;
};

export { getAllContests };

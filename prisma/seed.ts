import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const employees = [
  { name: "Rohan Deshpande", designation: "Senior Backend Engineer", skills: ["Java", "Spring Boot", "Kafka", "PostgreSQL"], status: "ACTIVE" as const },
  { name: "Sneha Iyer", designation: "Frontend Developer", skills: ["React", "TypeScript", "CSS", "Redux"], status: "ACTIVE" as const },
  { name: "Aman Qureshi", designation: "DevOps Engineer", skills: ["Docker", "Kubernetes", "AWS", "Terraform"], status: "ACTIVE" as const },
  { name: "Priya Nair", designation: "QA Engineer", skills: ["Selenium", "Cypress", "Postman", "JavaScript"], status: "ON_LEAVE" as const },
  { name: "Karthik Subramanian", designation: "Data Analyst", skills: ["Python", "SQL", "Pandas", "Tableau"], status: "ACTIVE" as const },
  { name: "Farah Sheikh", designation: "Product Designer", skills: ["Figma", "UX Research", "Prototyping"], status: "ACTIVE" as const },
  { name: "Vivek Menon", designation: "Engineering Manager", skills: ["Leadership", "Node.js", "System Design"], status: "INACTIVE" as const },
];

async function main() {
  // Cleared first so this script is safe to re-run without creating duplicates.
  await prisma.employee.deleteMany();
  await prisma.employee.createMany({ data: employees });
  console.log(`Seeded ${employees.length} employees.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

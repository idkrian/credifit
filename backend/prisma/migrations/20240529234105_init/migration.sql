-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salary" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Representative" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Representative_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_cpf_key" ON "Employee"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Representative_cnpj_key" ON "Representative"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Representative_email_key" ON "Representative"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Representative_cpf_key" ON "Representative"("cpf");

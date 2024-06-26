import { Controller, Get, Post, Body, Param, Delete, ValidationPipe, UsePipes, Put } from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { AuthEmployeeDto } from "./dto/auth-employee.dto";

@Controller("employee")
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Post("/auth")
  auth(@Body() authEmployeeDto: AuthEmployeeDto) {
    return this.employeeService.auth(authEmployeeDto);
  }
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.employeeService.findOne(+id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.employeeService.remove(+id);
  }
}

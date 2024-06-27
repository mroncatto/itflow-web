import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationFieldComponent } from './components/commons/validation-field/validation-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmComponent } from './components/modal/confirm/confirm.component';
import { PaginatorComponent } from './components/commons/paginator/paginator.component';
import { CompanyFormComponent } from './components/forms/company/company-form/company-form.component';
import { DepartmentFormComponent } from './components/forms/company/department-form/department-form.component';
import { OccupationFormComponent } from './components/forms/staff/occupation-form/occupation-form.component';
import { StaffFormComponent } from './components/forms/staff/staff-form/staff-form.component';
import { BranchFormComponent } from './components/forms/company/branch-form/branch-form.component';
import { SearchInputComponent } from './components/filters/search-input/search-input.component';
import { DepartmentCheckboxFilterComponent } from './components/filters/department-checkbox-filter/department-checkbox-filter.component';
import { OccupationCheckboxFilterComponent } from './components/filters/occupation-checkbox-filter/occupation-checkbox-filter.component';
import { DeviceFormComponent } from './components/forms/device/device-form/device-form.component';
import { NewDepartmentButtonComponent } from './components/quickform/new-department';
import { NewOccupationButtonComponent } from './components/quickform/new-occupation';
import { NewStaffButtonComponent } from './components/quickform/new-staff';
import { NewBranchButtonComponent } from './components/quickform/new-branch';
import { NewDeviceCategoryButtonComponent } from './components/quickform/new-device-category';
import { DeviceCategoryFormComponent } from './components/forms/device/device-category-form/device-category-form.component';
import { DeviceCategoryCheckboxFilterComponent } from './components/filters/device-category-checkbox-filter/device-category-checkbox-filter.component';
import { CheckboxFilterComponent } from './components/filters/checkbox-filter/checkbox-filter.component';
import { DeviceStaffFormComponent } from './components/forms/device/device-staff-form/device-staff-form.component';
import { DeviceComputerFormComponent } from './components/forms/device/device-computer-form/device-computer-form.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ComputerCategoryFormComponent } from './components/forms/computer/computer-category-form/computer-category-form.component';
import { ComputerCpuFormComponent } from './components/forms/computer/computer-cpu-form/computer-cpu-form.component';
import { ComputerMemoryFormComponent } from './components/forms/computer/computer-memory-form/computer-memory-form.component';
import { ComputerStorageFormComponent } from './components/forms/computer/computer-storage-form/computer-storage-form.component';
import { NewComputerCategory } from './components/quickform/new-computer-category';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ComputerCpuAutocompleteComponent } from './components/commons/autocomplete/computer-cpu-autocomplete/computer-cpu-autocomplete.component';
import { InputGroupComponent } from './components/commons/input-group/input-group.component';
import { ComputerMemoryAutocompleteComponent } from './components/commons/autocomplete/computer-memory-autocomplete/computer-memory-autocomplete.component';
import { ComputerStorageAutocompleteComponent } from './components/commons/autocomplete/computer-storage-autocomplete/computer-storage-autocomplete.component';
import { ComputerSoftwareFormComponent } from './components/forms/computer/computer-software-form/computer-software-form.component';
import { ComputerLicenseFormComponent } from './components/forms/computer/computer-license-form/computer-license-form.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LicenseKeyComponent } from './components/forms/license/license-key/license-key.component';
import { LicenseKeyAssignComponent } from './components/forms/license/license-key-assign/license-key-assign.component';
import { ComputerSoftwareAutocompleteComponent } from './components/commons/autocomplete/computer-software-autocomplete/computer-software-autocomplete.component';
import { LoadindWidgetComponent } from './components/commons/loadind-widget/loadind-widget.component';
import { DeviceComputerAutocompleteComponent } from './components/commons/autocomplete/device-computer-autocomplete/device-computer-autocomplete.component';

@NgModule({
  declarations: [
    ValidationFieldComponent,
    ConfirmComponent,
    StaffFormComponent,
    PaginatorComponent,
    DepartmentFormComponent,
    OccupationFormComponent,
    CompanyFormComponent,
    BranchFormComponent,
    SearchInputComponent,
    DepartmentCheckboxFilterComponent,
    OccupationCheckboxFilterComponent,
    DeviceFormComponent,
    NewDepartmentButtonComponent,
    NewOccupationButtonComponent,
    NewStaffButtonComponent,
    NewBranchButtonComponent,
    NewDeviceCategoryButtonComponent,
    DeviceCategoryFormComponent,
    DeviceCategoryCheckboxFilterComponent,
    CheckboxFilterComponent,
    DeviceStaffFormComponent,
    DeviceComputerFormComponent,
    ComputerCategoryFormComponent,
    ComputerCpuFormComponent,
    ComputerMemoryFormComponent,
    ComputerStorageFormComponent,
    NewComputerCategory,
    ComputerCpuAutocompleteComponent,
    InputGroupComponent,
    ComputerMemoryAutocompleteComponent,
    ComputerStorageAutocompleteComponent,
    ComputerSoftwareFormComponent,
    ComputerLicenseFormComponent,
    LicenseKeyComponent,
    LicenseKeyAssignComponent,
    ComputerSoftwareAutocompleteComponent,
    LoadindWidgetComponent,
    DeviceComputerAutocompleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatAutocompleteModule,
    TabsModule.forRoot(),  
    BsDatepickerModule.forRoot(),  
  ],
  exports: [
    ValidationFieldComponent,
    ConfirmComponent,
    StaffFormComponent,
    PaginatorComponent,
    DepartmentFormComponent,
    OccupationFormComponent,
    CompanyFormComponent,
    BranchFormComponent,
    SearchInputComponent,
    DepartmentCheckboxFilterComponent,
    OccupationCheckboxFilterComponent,
    DeviceFormComponent,
    NewDepartmentButtonComponent,
    NewOccupationButtonComponent,
    NewStaffButtonComponent,
    NewBranchButtonComponent,
    NewDeviceCategoryButtonComponent,
    NewComputerCategory,
    DeviceCategoryFormComponent,
    DeviceCategoryCheckboxFilterComponent,
    CheckboxFilterComponent,
    DeviceStaffFormComponent,
    DeviceComputerFormComponent,
    ComputerCpuAutocompleteComponent,
    ComputerMemoryAutocompleteComponent,
    ComputerStorageAutocompleteComponent,
    InputGroupComponent,
    ComputerSoftwareAutocompleteComponent,
    LoadindWidgetComponent
  ]
})
export class SharedModule { }

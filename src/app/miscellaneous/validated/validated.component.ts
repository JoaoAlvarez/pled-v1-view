import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewCell } from 'ng2-smart-table';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { SmartTableData } from '../../@core/data/smart-table';
import { UsuariosService } from "../../admin/usuarios/usuarios.service";


@Component({
  selector: 'ngx-validated',
  templateUrl: './validated.component.html',
  styleUrls: ['./validated.component.scss']
})
export class ValidatedComponent implements ViewCell, OnInit {


  renderValue: string;

  @Input() value: any;
  @Input() rowData: any;

  constructor(
    private service: SmartTableData,
    private UsuariosService: UsuariosService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.renderValue = this.value;
    console.log('renderValue', this.renderValue);
  }

  resendValidation() {
    console.log('rowData', this.rowData);

    const id = this.rowData._id ? this.rowData._id : this.rowData.id;

    this.UsuariosService
      .resendValidation(id)
      .pipe(finalize(() => { }))
      .subscribe((response) => {
        //Swal.fire('Ok', 'E-mail de validação reenviado', 'success');
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
        Toast.fire({
          icon: 'success',
          title: 'E-mail de validação reenviado com sucesso'
        })

      });
    return false;
  }

}

import { Component, ChangeDetectionStrategy } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";

import { SmartTableData } from "../../@core/data/smart-table";
import { InstituicaoService } from "../instituicao.service";
import { finalize } from "rxjs/operators";

import { BadgeComponent } from "../../@theme/components/badge/badge.component";
import { NgForOf } from '@angular/common';
//import { instituicoesAnexosComponent } from "../components/anexos.component";


@Component({
  selector: 'ngx-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})



export class TurmasComponent {

  settings = {
    hideSubHeader: true,
    actions: {
      add: false,
      position: "right",
      columnTitle: "Ações",
    },

    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent:
        '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      grupo: {
        title: "Grupo",
        type: "string",
        editable: true,
      },
      serie: {
        title: "Serie",
        type: "string",
        editable: false,
      },
      nome: {
        title: "Nome",
        type: "string",
        editable: false,
      },
      coordenador: {
        title: "Coordenador",
        type: "string",
        editable: false,
      },

    },
  };
 lists = [{grupo:'a'}];
 list1 = [];
  source: LocalDataSource = new LocalDataSource();
  turmas =[];
 

  constructor(
    private service: SmartTableData,
    private InstituicaoService: InstituicaoService
  ) {
    const data = this.service.getData();

    //this.source.load(data);
    this.getTurmas();

  }

  getTurmas() {
    this.InstituicaoService
      .getTurmas()
      .pipe(finalize(() => { }))
      .subscribe((response) => {
        console.log(response);
        this.lists = response;
        response.forEach(element => {
          this.list1.push(element);
          element.series.forEach(element2 => {
            this.turmas.push(element2);
            element2.turmas.forEach(element3 => {
            

          });
          
        });
        
        
      });
      console.log(this.turmas);
        this.source.load(response);
        this.source.refresh();
    })
  }

  onSearch(query: string = "") {
    if (query != "") {
      this.source.setFilter(
        [
          // fields we want to include in the search
          {
            field: "id",
            search: query,
          },
          {
            field: "grupo",
            search: query,
          },
          {
            field: "serie",
            search: query,
          },
          {
            field: "nome",
            search: query,
          },
          {
            field: "coordenador",
            search: query,
          },
          {
            field: "onboardStatus",
            search: query,
          },
        ],
        false
      );
    } else {
      this.source.reset();
    }
  }

  onDeleteConfirm(event): void {
    console.log(event);
    if (
      window.confirm(
        "Tem certeza que deseja exclulir esta turma?"
      )
    ) {
      // this.instituicoesService
      //   .reprovarUsuario(event.data.id)
      //   .pipe(finalize(() => { }))
      //   .subscribe((response) => {
      //     event.confirm.resolve();
      //     this.getInstituicoes();
      //   });
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event): void {
    console.log(event);


  }
}


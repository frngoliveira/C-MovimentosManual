import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MovimentoManual } from './shared/entity/movimentoManual';
import { Produto } from './shared/entity/produto';
import { Produto_cosif } from './shared/entity/produto_cosif';
import { MovimentoManualService } from './shared/service/movimentoManual.service';

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css'],
})
export class LancamentoComponent implements OnInit {
  produto!: Produto[];  
  movimentoManual!: MovimentoManual[];
  lancamento!: MovimentoManual;
  produto_cosif!: Produto_cosif[];
  registerForm!: FormGroup; 
  

  constructor(
    private fb: FormBuilder,
    private movimentoManualService: MovimentoManualService
  ) {}

  ngOnInit() {    
    this.validation();
    this.getProduto();
    this.getProdutoCosaf();
    this.getMovimentoManual();    
  }

  validation() {
    this.registerForm = this.fb.group({
      daT_MES: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(2)
      ])],
      daT_ANO: ['',Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(4)
      ])],
      coD_PRODUTO: ['', Validators.compose([
        Validators.required
      ])],
      coD_COSIF: ['', Validators.compose([
        Validators.required
      ])],
      deS_DESCRICAO: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ])],
      vaL_VALOR: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  salvar() {
    this.lancamento = Object.assign({}, this.registerForm.value);
    this.movimentoManualService
      .saveMovimentoManual(this.lancamento)
      .subscribe((lancamento: MovimentoManual) => {
        location.reload();
      });
  }

  getProduto() {
    this.movimentoManualService.getAllProduto().subscribe(      
      (_produto: Produto[]) => {
        this.produto = _produto;
        console.log(this.produto);
      }
    );
  }

  getMovimentoManual() {
    this.movimentoManualService.getAllMovimentoManual().subscribe(      
      (_movimentoManual: MovimentoManual[]) => {
        this.movimentoManual = _movimentoManual;
        console.log(this.produto);
      }
    );
  }

  getProdutoCosaf() {
    this.movimentoManualService.getAllProdutoCosif().subscribe(
      (_produtoCosaf: Produto_cosif[]) => {
        this.produto_cosif = _produtoCosaf;
        console.log(this.produto_cosif);
      }
    );
  }
}

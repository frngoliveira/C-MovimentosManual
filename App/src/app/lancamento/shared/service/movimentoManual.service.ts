import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Produto } from '../entity/produto';
import { Observable } from 'rxjs';
import { Produto_cosif } from '../entity/produto_cosif';
import { MovimentoManual } from '../entity/movimentoManual';

@Injectable({
  providedIn: 'root',
})
export class MovimentoManualService {
  baseUrl = 'https://localhost:44383/api/MovimentoManual';
  // '/GetAllMovimentoManual'
  // GetProCpsifManual

  constructor(public http: HttpClient) {}

  getAllProduto(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.baseUrl + '/GetProdutoAll');
  }

  getAllProdutoCosif(): Observable<Produto_cosif[]> {
    return this.http.get<Produto_cosif[]>(this.baseUrl + '/GetProdutoCosifAll');
  }

  getAllMovimentoManual(): Observable<MovimentoManual[]> {
    debugger
    return this.http.get<MovimentoManual[]>(this.baseUrl + '/GetProCpsifManual');
  }

  // tslint:disable-next-line:typedef
  saveMovimentoManual(movimentoManual: MovimentoManual) {
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<MovimentoManual>(
      this.baseUrl + '/Post',
      movimentoManual, {headers: headers}
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Ciudad } from '../../models/ciudad.model';

@Component({
  selector: 'app-nueva-partida',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nueva-partida.component.html',
  styleUrls: ['./nueva-partida.component.css']
})
export class NuevaPartidaComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


}

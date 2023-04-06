import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'dashboard';
  isMenuCollapsed: boolean = true;
  private data = [
    {"Framework": "Healthcare", "Stars": "5"},
    {"Framework": "Support", "Stars": "4"},
    {"Framework": "Workforce", "Stars": "5"},
    {"Framework": "Saleforce", "Stars": "3"},
    {"Framework": "Stategic Affairs", "Stars": "6"},
  ];
  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  

  ngOnInit() {
    this.createSvg();
    this.drawBars(this.data);
  }

  menuExpandOrCollapse() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  loadPage() {
    setTimeout(()=>{       
      window.location.reload();  
      this.isMenuCollapsed = true;
    }, 500);
  }

  createSvg(): void {
    this.svg = d3.selectAll("figure.bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
    .range([0, this.width])
    .domain(data.map(d => d.Framework))
    .padding(0.2);
  
    // Draw the X-axis on the DOM
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(0,0)rotate(0)")
    .style("text-anchor", "end");
  
    // Create the Y-axis band scale
    const y = d3.scaleLinear().domain([0, 20]).range([this.height, 0]);
  
    // Draw the Y-axis on the DOM
    this.svg.append("g").call(d3.axisLeft(y));
  
    // Create and fill the bars
    this.svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d: any) => x(d.Framework))
    .attr("y", (d: any) => y(d.Stars))
    .attr("width", x.bandwidth())
    .attr("height", (d: any) => this.height - y(d.Stars))
    .attr("fill", "#0a27f7");
  }
}
import { AfterViewInit, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { HalfYearlyPdfService } from '../../services/half-yearly-pdf.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-half-yearly-marksheet',
  templateUrl: './half-yearly-marksheet.component.html',
  styleUrls: ['./half-yearly-marksheet.component.css']
})
export class HalfYearlyMarksheetComponent {
  @ViewChild('halfyearlymarksheet') marksheet!: ElementRef;
  @Input() marksheetData:any;
  @Input() commonMarks:any;
  constructor(private pdfService: HalfYearlyPdfService,private elementRef: ElementRef) {
    console.log('Halfyearly marksheet');
    console.log("adarsh",this.marksheetData);
  }

  getHtmlContent(): any {
    return this.elementRef.nativeElement;
  
  }
  exportAsPDF() {
    const pdfOptions = {
      filename: 'marksheet.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
  
    const content = this.marksheet.nativeElement;

    html2canvas(content).then((canvas) => {
      const pdf = new jspdf.jsPDF();  // Use the provided constructor
      pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height);
      pdf.save(pdfOptions.filename);
    });
  }
  
 calculateGrade(obtainMarks: number, totalMarks: number): string {
  const percentage = (obtainMarks / totalMarks) * 100;

      if (percentage >= 85) {
        return  'A+';
    } else if (percentage >= 70) {
        return 'A';
    } else if (percentage >= 50) {
        return 'B+';
    } else
        return  'B';
      
  
}
calculateRemarks(obtainMarks: number, totalMarks: number):String{
  const percentage = (obtainMarks / totalMarks) * 100;

  if (percentage >= 85) {
      return  'Excellent';
  } else if (percentage >= 70) {
      return 'Very Good';
  } else if (percentage >= 50) {
      return 'Good';
  } else
      return  'Satisfactory';
    
  
}
}

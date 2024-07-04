import {
    Component,
    ElementRef,
    AfterViewInit,
    EventEmitter,
    ViewChild,
    Output,
  } from '@angular/core';
  import WebViewer, { WebViewerInstance } from '@pdftron/webviewer';
  import { Subject } from 'rxjs';
    
  @Component({
    selector: 'app-pdf-viewer',
    templateUrl: './pdf-viewer.component.html',
    styleUrls: ['./pdf-viewer.component.css'],
  })
  export class PdfViewerComponent implements AfterViewInit {
    wvInstance?: WebViewerInstance;
  
    @ViewChild('viewer') viewer!: ElementRef;
  
    @Output() coreControlsEvent: EventEmitter<string> = new EventEmitter();
  
    private documentLoaded$: Subject<void>;
    private fff = new Blob();
  
    constructor() {
      this.documentLoaded$ = new Subject<void>();
    }
    
    async loadViewer(wv: WebViewerInstance) {

        console.log('NG ONINT CALLED');
        let fl = await fetch('https://pdfobject.com/pdf/sample.pdf')
        .then((r) => {
          console.log(wv);
          console.log("file loaded");
          return r.blob();
        });

        wv.UI.loadDocument(fl, {
            filename: 'myfile.pdf',
        });
    }

    ngAfterViewInit(): void {
      console.log("init webviewer");

      WebViewer(
        {
          path: '../lib', // Path to the WebViewer library folder
        //   initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf',
        },
        this.viewer.nativeElement
      ).then((instance) => {
        this.wvInstance = instance;
        this.loadViewer(instance);
        // this.coreControlsEvent.emit(instance.UI.LayoutMode.Single);
  
        const { documentViewer, Annotations, annotationManager } = instance.Core;
  
        // instance.UI.openElements(['notesPanel']);
  
        documentViewer.addEventListener('annotationsLoaded', () => {
          console.log('annotations loaded');
        });

      });
    }
  }
  
import {Component, AfterViewInit, Output, EventEmitter} from '@angular/core';

//INITIAL VALUE FOR JQUERY
declare var $;

@Component({
    selector: 'table-diagram',
    templateUrl: `client/directives/diagram/diagram.component.html`,
    styleUrls: ['client/directives/diagram/diagram.component.css']
})
export class TableComponent implements AfterViewInit{

    public MyModal;  // => MODAL CONTAINER
    //MODAL DYNAMIC INFORMATION
    public header;

    @Output() OpenModalEmit = new EventEmitter;

    constructor() { }
    ngAfterViewInit(){

        //INTIAL MODAL SET UP
        this.SetUpInitialVariables();
        //INITIAL TABLE VALUE ON HOVER
        let currentTableHoveredOver,
            currentTableInfo;
        //ONCLICK MODAL
        $(".table").click( (x) => {
            console.log(currentTableHoveredOver);
            $("#ModalHeader")[0].innerHTML = currentTableHoveredOver.toUpperCase().replace(/\d/, (x) => " "+x);
            this.OpenModalEmit.emit(currentTableHoveredOver);
                // this.MyModal.modal("show");
        });
        //CREATE THE HOVER EFFECT ON THE TABLE
        $(".table").hover((x) => {
            currentTableHoveredOver = x.target.id;
            $(x.target.parentElement.previousSibling).css('transform', 'scale(0.7)');
            $(x.target).css('cursor', 'pointer');
        }, (p) => { // => SCALE DOWN WHEN MOUSED AWAY
            $(p.target.parentElement.previousSibling).css('transform', 'scale(0.529392950819546,0.5299601152980852)');
        })
    }

    SetUpInitialVariables(){
        this.MyModal = $('.main-modal'); // => MODAL
        this.header = $("#ModalHeader")[0].innerHTML; // => MODAL TITLE
    }

}
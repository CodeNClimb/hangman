import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { BackdropProps } from '@material-ui/core';

export interface DialogData {
  endGame: boolean;
  restart: boolean;
}


@Component({
  selector: 'app-root',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  providers: []
})
export class DialogOverviewExample {
  endGame: boolean = false;
  restart: boolean = false;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {endGame: this.endGame, restart: this.restart},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.restart = result;
    });
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './popup.component.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
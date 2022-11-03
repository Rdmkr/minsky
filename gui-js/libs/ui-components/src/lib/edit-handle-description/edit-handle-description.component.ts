import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ElectronService } from '@minsky/core';

@Component({
  selector: 'minsky-edit-handle-description',
  templateUrl: './edit-handle-description.component.html',
  styleUrls: ['./edit-handle-description.component.scss', '../generic-form.scss'],
})
export class EditHandleDescriptionComponent implements OnInit {
  handleIndex: number;

  editDescriptionForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private electronService: ElectronService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.handleIndex = +params['handleIndex'];
      this.editDescriptionForm = new FormGroup({
        description: new FormControl(params['description']),
      });
    });
  }

  async handleSave() {
    if (this.electronService.isElectron) {
      await this.electronService.saveHandleDescription({
        handleIndex: this.handleIndex,
        description: this.editDescriptionForm.get('description').value,
      });
    }
    this.closeWindow();
  }

  closeWindow() {
    if (this.electronService.isElectron) {
      this.electronService.remote.getCurrentWindow().close();
    }
  }
}
import { NgModule                } from '@angular/core';
import { BrowserModule           } from '@angular/platform-browser';
import { AppRoutingModule        } from './app-routing.module';
import { AppComponent            } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule        } from '@angular/material/toolbar';
import { MatIconModule           } from '@angular/material/icon';
import { MatButtonModule         } from '@angular/material/button';
import { UserAddEditComponent    } from './user-add-edit/user-add-edit.component';
import { MatDialogModule         } from '@angular/material/dialog';
import { MatFormFieldModule      } from '@angular/material/form-field';
import { MatInputModule          } from '@angular/material/input';
import { MatDatepickerModule     } from '@angular/material/datepicker';
import { MatNativeDateModule     } from '@angular/material/core';
import { MatRadioModule          } from '@angular/material/radio';
import { MatSelectModule         } from '@angular/material/select';
import { MatCheckboxModule       } from '@angular/material/checkbox';
import { ReactiveFormsModule     } from '@angular/forms';
import { HttpClientModule        } from '@angular/common/http';
import { MatTableModule          } from '@angular/material/table';
import { MatPaginatorModule      } from '@angular/material/paginator';
import { MatSortModule           } from '@angular/material/sort';
import { MatSnackBarModule       } from '@angular/material/snack-bar';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { PasswordComponent } from './password/password.component';





@NgModule({
  declarations: [
    AppComponent,
    UserAddEditComponent,
    PasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    NgPersianDatepickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

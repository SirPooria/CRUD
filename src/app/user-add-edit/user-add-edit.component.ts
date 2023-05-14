import { Component, OnInit, Inject, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { MatSelectChange } from '@angular/material/select';
import { Jalali } from 'jalali-ts';


@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css'],
})
export class UserAddEditComponent implements OnInit {
  selectedProvince: string | null = null;
  userform: FormGroup;
  dateValue = new FormControl();
  provinces: {provinceName: string, cities: string[]}[] = [
    {provinceName: 'آذربایجان شرقی', cities: ['تبریز', 'آذرشهر', 'اسکو']},
    {provinceName: 'آذربایجان غربی', cities: ['ارومیه', 'خوی', 'مهاباد']},
    {provinceName: 'اردبیل', cities: ['پارس آباد', 'مشکین شهر', 'خلخال']},
    {provinceName: 'اصفهان', cities: ['کاشان', 'خمینی شهر', 'نجف آباد']},
    {provinceName: 'البرز', cities: ['کرج', 'هشتگرد', 'محمدشهر']},
    {provinceName: 'ایلام', cities: ['ایوان', 'دهلران', 'آبدانان']},
    {provinceName: 'بوشهر', cities: ['برازجان', 'گناوه', 'خورموج']},
    {provinceName: 'تهران', cities: ['تهران', 'ری', 'قدس']},
    {provinceName: 'چهارمحال و بختیاری', cities: ['شهرکرد', 'فرخ‌شهر', ' بروجن']},
    {provinceName: 'خراسان جنوبی', cities: ['بیرجند', 'فردوس', 'نهبندان']},
    {provinceName: 'خراسان رضوی', cities: ['مشهد', 'نیشابور', 'تربت حیدریه']},
    {provinceName: 'خراسان شمالی', cities: ['بجنورد', 'اسفراین', 'گرمه جاجرم']},
    {provinceName: 'خوزستان', cities: ['اهواز', 'دزفول', 'اندیمشک']},
    {provinceName: 'زنجان', cities: ['ابهر،', 'خرمدره', 'زنجان']},
    {provinceName: 'سمنان', cities: ['سمنان', 'دامغان', 'گرمسار']},
    {provinceName: 'فارس', cities: ['شیراز', 'مرودشت', 'جهرم']},
    {provinceName: 'قزوین', cities: ['الوند', 'قزوین', 'اقبالیه']},
    {provinceName: 'قم', cities: ['قنوات', 'جعفریه', 'قم']},
    {provinceName: 'کردستان', cities: ['سنندج', 'سقز', 'مریوان']},
    {provinceName: 'کرمان', cities: ['سیرجان', 'رفسنجان', 'کرمان']},
    {provinceName: 'کرمانشاه', cities: ['کرمانشاه', 'کنگاور', 'هرسین']},
    {provinceName: 'کهگیلویه و بویراحمد', cities: ['لیکک', 'دهدشت', 'یاسوج']},
    {provinceName: 'گلستان', cities: ['گرگان', 'بندر ترکمن', 'گنبد کاووس،']},
    {provinceName: 'گیلان', cities: ['رشت', 'لاهیجان', 'آستانه']},
    {provinceName: 'لرستان', cities: ['خرم آباد', 'بروجرد', 'درود']},
    {provinceName: 'مازندران', cities: ['ساری', 'آمل', 'درود']},
    {provinceName: 'مرکزی', cities: ['اراک', 'محلات', 'خمین']},
    {provinceName: 'هرمزگان', cities: ['بندرعباس', 'بندر لنگه', 'دهبارز']},
    {provinceName: 'همدان', cities: ['همدان', 'نهاوند', 'تویسرکان']},
    {provinceName: 'یزد', cities: ['یزد', 'میبد', 'اردکان']}
  ];
  cities: string[] = [];
  onProvinceSelectionChange(event: MatSelectChange) {
    // استان انتخاب شده رو پیدا میکنه
    const selectedProvince = this.provinces.find(p => p.provinceName === event.value);
    if (selectedProvince) {
      // لیست شهر ها رو بر اساس شهرهای داخل اون استان آپدیت میکنه
      this.cities = selectedProvince.cities;
      // سلکت شهر ها رو فعال میکنه
      this.userform.get('City')?.enable();
      // استان مورد نظر رو ست میکنه
      this.selectedProvince = selectedProvince.provinceName;
    } else {
      // لیست شهر ها رو خالی میکنه و سلکت باکسش رو دوباره غیرفعال میکنه
      this.cities = [];
      this.userform.get('City')?.disable();
      this.userform.patchValue({ City: null });
      // استان انتخاب شده رو ریست میکنه
      this.selectedProvince = null;
    }
  }
  get filteredCities() {
    if (this.selectedProvince) {
      // شهرهای موردنظر یک استان خاص رو اینجا فیلتر میکنه
      return this.cities.filter(city => {
        const province = this.provinces.find(p => p.provinceName === this.selectedProvince);
        return province?.cities.includes(city);
      });
    }
    return [];
  }
  constructor(
    private _fb: FormBuilder,
    private _userService: UsersService,
    private _Dialogref: MatDialogRef<UserAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    ) {
    this.userform = this._fb.group({
      Name:'',
      Dob: '',
      Gender: '',
      Password: '',
      Rpassword: '',
      Activition: '',
      Province: '',
      City: '',
    });
  }
  ngOnInit(): void {
    this.userform.patchValue(this.data);
    this.userform.patchValue(this.dateValue);
  }
  OnformSubmit(){
    if(this.userform.valid) {
      if(this.data) {
        this._userService.edituser(this.data.id, this.userform.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('User edited!');
            this._Dialogref.close(true);
          },
          error: (err: any) => {
            console.error(err)
          }
        });
      } else {
        this._userService.adduser(this.userform.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('User Added!');
            this._Dialogref.close(true);
          },
          error: (err: any) => {
            console.error(err)
          }
        });
      };
      };
    };
}
const jalali = Jalali.parse('1400/09/14');
console.log(jalali.valueOf());
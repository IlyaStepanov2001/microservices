import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";
import {ErrorService} from "../../services/error.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLogin: boolean = true;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private errorService: ErrorService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log('Logging in', this.loginForm.value);
      const credentials = this.loginForm.value;
      this.authService.signin(credentials).subscribe(
        (response) => {
          console.log('Login successful', response);
          // Например, сохраняем токен в localStorage
          // localStorage.setItem('auth_token', response.token);
          // Перенаправляем пользователя, если нужно
        },
        (error) => {
          console.error('Login failed', error),
          this.errorHandler.bind(this);
        }
      );
    }
    }

  onRegister() {
    if (this.registerForm.valid) {
      console.log('Registering', this.registerForm.value);
      const credentials = this.registerForm.value;
      this.authService.signup(credentials).subscribe(
        (response) => {
          console.log('Registration successful', response);
          // Например, можно сразу залогинить пользователя после регистрации
          // localStorage.setItem('auth_token', response.token);
          // Перенаправляем пользователя, если нужно
        },
        (error) => {
          console.error('Registration failed', error);
          // Показываем ошибку пользователю
        }
      );
    }
  }


  private passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError( () => error.message)
  }

}

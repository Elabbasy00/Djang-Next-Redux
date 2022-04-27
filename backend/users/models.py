from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
from .manager import CustomUserManager

USERNAME_REGEX = r'^[\w.@+\- ]+$'

# def validate_length(value):
#     if len(str(value)) != 14:
#         raise ValidationError(
#             _('Must be an 14 Number'),
#             params={'value': value},
#         )


class User(AbstractUser):
    username = models.CharField(max_length=150, unique=False, null=True, blank=True, validators=[RegexValidator(
        regex=USERNAME_REGEX, message='الاسم يجب ان يتكون من احرف و ارقام', code='invalid_username')])

    email = models.EmailField(_('email address'), unique=True)

    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{8,15}$', message="الرقم غير صحيح برجاء ادخال رقم صحيح")

    phone_number = models.CharField(
        validators=[phone_regex], max_length=17, unique=True)

    is_admin = models.BooleanField(default=False)

    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = ['email']

    objects = CustomUserManager()

    def __str__(self):
        return self.first_name

    def get_short_name(self):
        # The user is identified by their email address
        return self.first_name + " " + self.last_name

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    class Meta:
        verbose_name = 'المستخدمين'
        verbose_name_plural = 'المستخدمين'

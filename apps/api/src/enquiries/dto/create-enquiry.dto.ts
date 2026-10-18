import { Transform } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsEmail, IsIn, IsOptional, IsString, Length, MaxLength } from 'class-validator';

export const SECTIONS = ['Banking & Fintech', 'Business Automation', 'Education & Wellbeing', 'General enquiry'] as const;
export type Section = (typeof SECTIONS)[number];

const trim = ({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value);

export class CreateEnquiryDto {
  @IsIn(SECTIONS as unknown as string[])
  section: Section;

  @Transform(trim) @IsString() @Length(2, 120)
  name: string;

  @Transform(trim) @IsEmail({}, { message: 'Please enter a valid email address.' }) @MaxLength(200)
  email: string;

  @IsOptional() @Transform(trim) @IsString() @MaxLength(40)
  phone?: string;

  @IsOptional() @Transform(trim) @IsString() @MaxLength(200)
  organisation?: string;

  @IsOptional() @Transform(trim) @IsString() @MaxLength(80)
  role?: string;

  @IsOptional() @Transform(trim) @IsString() @MaxLength(120)
  jobTitle?: string;

  @IsOptional() @Transform(trim) @IsString() @MaxLength(80)
  institutionType?: string;

  @IsOptional() @Transform(trim) @IsString() @MaxLength(80)
  country?: string;

  @IsOptional() @Transform(trim) @IsString() @MaxLength(120)
  interest?: string;

  @IsOptional() @IsArray() @ArrayMaxSize(10) @IsString({ each: true }) @MaxLength(80, { each: true })
  interests?: string[];

  @IsOptional() @Transform(trim) @IsString() @MaxLength(40)
  users?: string;

  @IsOptional() @Transform(trim) @IsString() @MaxLength(4000)
  message?: string;

  /** Honeypot. Real visitors never fill it in. */
  @IsOptional() @IsString() @MaxLength(200)
  website?: string;
}

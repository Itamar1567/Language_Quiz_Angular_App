using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class createInitial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Challenges",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "Options",
                table: "Challenges",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "Language",
                table: "Challenges",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "Explanation",
                table: "Challenges",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "Difficulty",
                table: "Challenges",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Challenges",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "Challenges",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<int>(
                name: "CorrectAnswerId",
                table: "Challenges",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Challenges",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "ChallengeQuotas",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<int>(
                name: "QuotaRemaining",
                table: "ChallengeQuotas",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<DateTime>(
                name: "LastResetDate",
                table: "ChallengeQuotas",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "ChallengeQuotas",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Challenges",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "Options",
                table: "Challenges",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "Language",
                table: "Challenges",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "Explanation",
                table: "Challenges",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "Difficulty",
                table: "Challenges",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "DateCreated",
                table: "Challenges",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "Challenges",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<int>(
                name: "CorrectAnswerId",
                table: "Challenges",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Challenges",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "ChallengeQuotas",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<int>(
                name: "QuotaRemaining",
                table: "ChallengeQuotas",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "LastResetDate",
                table: "ChallengeQuotas",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "ChallengeQuotas",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);
        }
    }
}

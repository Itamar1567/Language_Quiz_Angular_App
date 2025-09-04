using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

public class Challenge
{
    [Key]
    public int Id { get; set; }
    public string Difficulty { get; set; } = "easy";
    public DateTime DateCreated { get; set; } = DateTime.Now;
    public string CreatedBy { get; set; } = "";
    [Required]
    public string Title { get; set; } = "";
    [Required]
    public string[] Options { get; set; } = { };
    [Required]
    public int CorrectAnswerId { get; set; }
    [Required]
    public string Explanation { get; set; } = "";
}

public class ChallengeQuota
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string UserId { get; set; } = "";
    public int QuotaRemaining { get; set; }
    public DateTime LastResetDate { get; set; }
}


//Create tables
public class AppDbContext : DbContext
{
    public DbSet<Challenge> Challenges { get; set; }
    public DbSet<ChallengeQuota> ChallengeQuotas { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite("Data Source=database.db");
}


using Microsoft.AspNetCore.Mvc;
public class DatabaseRepository
{

    readonly AppDbContext _dbContext;

    const int defaultQuota = 35;

    public DatabaseRepository(AppDbContext _db)
    {
        _dbContext = _db;
    }


    public ChallengeQuota CreateQuota(string Id)
    {

        var newQuota = new ChallengeQuota
        {
            UserId = Id,
            QuotaRemaining = defaultQuota,
            LastResetDate = DateTime.Now,

        };

        var quotaExists = _dbContext.ChallengeQuotas.FirstOrDefault(q => q.UserId == Id);

        if (quotaExists != null) return quotaExists;
        
        else
        {
            _dbContext.ChallengeQuotas.Add(newQuota);
            _dbContext.SaveChanges();
            return newQuota;
        }



    }
    public void ResetQuota(string Id, ChallengeQuota q)
    {

        DateTime now = DateTime.Now;

        if (q == null)
        {
            //for fallback
            CreateQuota(Id);
        }
        else if (now - q.LastResetDate >= TimeSpan.FromHours(24))
        {
            q.QuotaRemaining = defaultQuota;
            q.LastResetDate = now;
        }

        _dbContext.SaveChanges();

    }

    public int AddOrRemoveQuota(int num, string Id)
    {

        var quota = _dbContext.ChallengeQuotas.FirstOrDefault(q => q.UserId == Id);

        if (quota == null)
        {
            quota = CreateQuota(Id);
        }
        if (quota.QuotaRemaining <= 0)
        {
            return 0;
        }

        quota.QuotaRemaining += num;
        _dbContext.SaveChanges();

        return quota.QuotaRemaining;
    }

    public ChallengeQuota GetUserQuota(string Id)
    {
        var quota = _dbContext.ChallengeQuotas.FirstOrDefault(q => q.UserId == Id);
        if (quota == null)
        {
            quota = CreateQuota(Id);
        }

        ResetQuota(Id, quota);
        
        return quota;
    }
    public Challenge CreateChallenge(string Difficulty, string createdBy, string title, string[] options, int correctAnswerId, string explanation, string language)
    {
        //new challenge obj
        var newChallenge = new Challenge
        {
            Difficulty = Difficulty,
            CreatedBy = createdBy,
            Title = title,
            Options = options,
            CorrectAnswerId = correctAnswerId,
            Explanation = explanation,
            Language = language,

        };

        _dbContext.Challenges.Add(newChallenge);
        _dbContext.SaveChanges();

        Console.WriteLine("Challenge created successfully!");

        return newChallenge;

    }
    public void ResetUserChallenges(string userId)
    {
        _dbContext.RemoveRange(_dbContext.Challenges.Where(c => c.CreatedBy == userId).ToList());
        _dbContext.SaveChanges();
    }
    public int GetRemainingQuota(string Id)
    {
        var quota = _dbContext.ChallengeQuotas.Where(q => q.UserId == Id).Select(q => q.QuotaRemaining).FirstOrDefault();
        return quota;


    }
    public List<Challenge> GetUserChallenges(string userId)
    {
        var challenges = _dbContext.Challenges.Where(c => c.CreatedBy == userId).ToList();
        return challenges;

    }

    public string HttpCallTestFunction()
    {
        return "This Test worked";
    }
}

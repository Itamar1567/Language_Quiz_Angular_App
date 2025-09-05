using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;

public class ChallengeRequest
{
    public string Difficulty { get; set; } = "easy";
    public string Language { get; set; } = "english";
}

public class ChallengeResponse
{
    public string Difficulty { get; set; } = "null";
    public string title { get; set; } = "null";
    public string[] Options { get; set; } = ["null", "null", "null", "null"];
    public int CorrectAnswerId { get; set; } = 0;
    public string Explanation { get; set; } = "Null";
    public string Language { get; set; } = "null";
}

[ApiController]
[Route("api/[controller]")]
public class ChallengeController : ControllerBase
{

    private readonly AIGenerateChallenge challengeGenerator;
    private readonly DatabaseRepository _db;

    public ChallengeController(DatabaseRepository db, AIGenerateChallenge aiGC)
    {
        challengeGenerator = aiGC;
        _db = db;
    }

    [HttpGet("test")]
    public IActionResult TestFunction()
    {
        return Ok(_db.HttpCallTestFunction());
    }

    [HttpGet("testai")]
    public async Task<IActionResult> TestAi()
    {
        return Ok(await challengeGenerator.GenerateChallenge("easy", "english"));
    }

    [HttpGet("user-quota")]
    public IActionResult GetUserQuota()
    {
        var user_id = User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(user_id))
        {
            return Unauthorized("Could not find user ID, to fetch quota");
        }
        else
        {
            var userQuota = _db.GetUserQuota(user_id);
            return Ok(new { quotaRemaining = userQuota.QuotaRemaining });
        }

    }

    [HttpPost("generate-challenge")]
    public async Task<IActionResult> GenerateChallenge([FromBody] ChallengeRequest request)
    {

        var user_id = User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(user_id))
        {
            return Unauthorized(new { error = "User ID not found" });
        }
        else
        {
            List<Challenge> challenges = _db.GetUserChallenges(user_id);

            Challenge newChallengeData = await challengeGenerator.GenerateChallenge(request.Difficulty, request.Language);

            Challenge newChallenge = _db.CreateChallenge(
                Difficulty: request.Difficulty,
                createdBy: user_id,
                title: newChallengeData.Title,
                options: newChallengeData.Options,
                correctAnswerId: newChallengeData.CorrectAnswerId,
                explanation: newChallengeData.Explanation,
                language: request.Language

            );

            ChallengeResponse newResponse = new ChallengeResponse
            {
                Difficulty = request.Difficulty,
                title = newChallenge.Title,
                Options = newChallenge.Options,
                CorrectAnswerId = newChallenge.CorrectAnswerId,
                Explanation = newChallenge.Explanation,
                Language = request.Language,
            };

            var quota = _db.AddOrRemoveQuota(-1, user_id);

            if (quota <= 0)
            {
                return StatusCode(429, "Quota Exausted");
            }

            return Ok(newResponse);
        }
    }

    [HttpGet("get-challenges")]
    public IActionResult GetUserChallenges()
    {
        var user_id = User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(user_id))
        {
            return Unauthorized(new { error = "User ID not found" });
        }
        else
        {
            List<Challenge> userChallenges = _db.GetUserChallenges(user_id);


            var challengeResponse = userChallenges.Select(c => new ChallengeResponse
            {
                Difficulty = c.Difficulty ?? "null",
                title = c.Title ?? "null",
                Options = c.Options ?? ["null", "null", "null", "null"],
                CorrectAnswerId = c.CorrectAnswerId,
                Explanation = c.Explanation ?? "null",
                Language = c.Language ?? "null"

            }).ToList();

            return Ok(challengeResponse);
        }

    }
}
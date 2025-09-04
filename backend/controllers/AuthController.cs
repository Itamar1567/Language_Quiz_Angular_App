using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class AuthorizationController : ControllerBase
{
    [HttpGet("user")]
    [Authorize]
    public IActionResult GetUser()
    {

        var user_id = User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(user_id))
        {
            return Unauthorized(new { error = "User ID not found" });
        }
        else
        {
            return Ok(new { userID = user_id });
        }
    }
}

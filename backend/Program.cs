using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var corsPolicy = "_myPolicy";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(
    options =>
    {
        options.Authority = "https://related-hedgehog-43.clerk.accounts.dev";
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = "https://related-hedgehog-43.clerk.accounts.dev",
            ValidateAudience = false,
            ValidateLifetime = true,
        };
    }
);

builder.Services.AddAuthorization();

builder.Services.AddHttpClient();


builder.Services.AddControllers();

builder.Services.AddScoped<DatabaseRepository>();
builder.Services.AddScoped<AIGenerateChallenge>();

var apiKey = builder.Configuration["OPENAI_KEY"];


builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicy, corsPolicy =>
    {
        corsPolicy.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors(corsPolicy);
app.UseAuthentication();
app.UseAuthorization();



app.MapControllers();

app.Run();

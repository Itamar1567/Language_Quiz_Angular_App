using System.ClientModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.OpenApi.Any;
using OpenAI;
using OpenAI.Chat;
using OpenAI.Models;

public class AIGenerateChallenge
{

    private readonly string _openAIKey;

    public AIGenerateChallenge(IConfiguration config)
    {
        _openAIKey = config["OPENAI_KEY"] ?? "Key not found";
    }


    public async Task<Challenge> GenerateChallenge(string difficulty, string language, string historyTitles)
    {

        ChatClient client = new(model: "gpt-3.5-turbo-0125", credential: new ApiKeyCredential(_openAIKey));

        string systemRole = "You are an expert language challenge creator.";

        string userMessage = $@"Your task is to generate a language question given the difficulty criteria, and target language,
        with multiple choice answers. The question should be appropriate for the specified difficulty level. Difficulty = {difficulty} 
        IMPORTANT: Do not repeat any question you have given before. Always create a new, unique challenge with different words and structure.

        PREVIOUSLY ASKED QUESTIONS: {historyTitles}

        TARGET LANGUAGE: {language}

        1.For difficulty easy questions: Focus on basic words, 3 - 5 word sentences, or common conventions, and ask the question in English.
        2.For difficulty medium questions: Cover intermediate concepts like sentence structure, 5-9 word sentences, or language features, and ask the question in English.
        3.For difficulty hard questions: Include advanced words, punctuation, or complex sentences, and ask the question in the given language.

        Return the challenge in the following JSON structure without any backticks:
        {{
            ""Title"": ""The question title"",
            ""Options"": [""Option 1"", ""Option 2"", ""Option 3"", ""Option 4""],
            ""CorrectAnswerId"": 0, // Index of the correct answer (0-3)
            ""Explanation"": ""Detailed explanation of why the correct answer is right""
        }}

        Make sure the options are plausible but with only one clearly correct answer.";

        var messages = new List<ChatMessage>
        {
            new SystemChatMessage(systemRole),
            new UserChatMessage(userMessage),
        };

        try
        {
            ChatCompletion chatCompletion = await client.CompleteChatAsync(messages: messages, options: new ChatCompletionOptions { Temperature = 0.7f, MaxOutputTokenCount = 300, });

            var response = string.Join("\n", chatCompletion.Content.Select(c => c.Text));

            Challenge? newChallenge = JsonSerializer.Deserialize<Challenge>(response);

            if (newChallenge != null)
            {
                return newChallenge;
            }
            else
            {
                return new Challenge
                {
                    Explanation = "Could not retrieve data",
                    Options = ["We", "Are", "Sorry"],
                    CorrectAnswerId = 1,
                    Title = "Terribly sorry"
                };
            }


        }
        catch (Exception ex)
        {
            Console.WriteLine("Could not fetch respone: " + ex);
            return new Challenge
            {
                Explanation = "Could not retrieve data",
                Options = ["We", "Are", "Sorry"],
                CorrectAnswerId = 1,
                Title = "Terribly sorry"
            };
        }

    }
}
public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty; // Zgjidhja për warning-un
    public string Email { get; set; } = string.Empty;    // Zgjidhja për warning-un

    // Për byte array, përdor ? që të lejosh null deri sa të mbushen
    public byte[]? PasswordHash { get; set; }
    public byte[]? PasswordSalt { get; set; }

    public string Role { get; set; } = "Admin";         // Zgjidhja për warning-un
}
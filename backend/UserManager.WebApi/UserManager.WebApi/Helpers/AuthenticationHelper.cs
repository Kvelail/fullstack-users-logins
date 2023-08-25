using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace UserManager.WebApi.Helpers
{
    public class AuthenticationHelper
    {
        public static string GenerateJSONWebToken(string issuer, string key, int expiresAfterHours)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken
            (
              issuer,
              issuer,
              null,
              expires: DateTime.Now.AddHours(expiresAfterHours),
              signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}

using System.Text;

namespace UserManager.WebApi.Helpers
{
    public static class EncryptionHelper
    {
        public static string EncryptBase64(string text)
        {
            var plainTextBytes = Encoding.UTF8.GetBytes(text);

            return Convert.ToBase64String(plainTextBytes);
        }

        public static string DecryptBase64(string text)
        {
            var base64EncodedBytes = Convert.FromBase64String(text);

            return Encoding.UTF8.GetString(base64EncodedBytes);
        }
    }
}

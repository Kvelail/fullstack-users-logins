namespace UserManager.WebApi.Helpers
{
    public static class EncryptionHelper
    {
        public static string EncryptBase64(string text)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(text);

            return System.Convert.ToBase64String(plainTextBytes);
        }

        public static string DecryptBase64(string text)
        {
            var base64EncodedBytes = Convert.FromBase64String(text);

            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }
    }
}

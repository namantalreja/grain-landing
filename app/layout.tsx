import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Grain | The Data Layer for AI ',
  description: 'The data layer for AI. Transform raw data into AI-ready context.',
  icons: {
    icon: '/grain-logo.png',
    shortcut: '/grain-logo.png',
    apple: '/grain-logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function($) {
                window.fnames = new Array(); 
                window.ftypes = new Array();
                fnames[0]='EMAIL';
                ftypes[0]='email';
                fnames[1]='FNAME';
                ftypes[1]='text';
                fnames[2]='LNAME';
                ftypes[2]='text';
                fnames[3]='ADDRESS';
                ftypes[3]='address';
                fnames[4]='PHONE';
                ftypes[4]='phone';
                fnames[5]='BIRTHDAY';
                ftypes[5]='birthday';
                fnames[6]='COMPANY';
                ftypes[6]='text';
              }(jQuery));
              var $mcj = jQuery.noConflict(true);
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}

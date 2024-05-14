import React from 'react';
import Head from 'next/head';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

type LayoutProps = {
    title: string;
    children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <header>
                <Navbar />
            </header>
            <main className='max-w-screen'>{children}</main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Layout;
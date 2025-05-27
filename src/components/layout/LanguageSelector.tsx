
import { useState } from 'react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Flag } from 'lucide-react';

const languages = [
  { code: 'en' as Language, name: 'English', flag: '🇬🇧' },
  { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
  { code: 'da' as Language, name: 'Dansk', flag: '🇩🇰' },
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-foreground hover:text-primary transition-colors">
          <span className="text-lg" role="img" aria-label={`Current language: ${currentLanguage.name}`}>
            {currentLanguage.flag}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={language === lang.code ? 'bg-accent' : ''}
          >
            <span className="mr-2 text-lg" role="img" aria-label={lang.name}>
              {lang.flag}
            </span>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

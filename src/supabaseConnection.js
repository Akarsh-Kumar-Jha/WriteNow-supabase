import {createClient} from '@supabase/supabase-js';

const supabase = createClient('https://kbcuiyitunpejxjppefq.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtiY3VpeWl0dW5wZWp4anBwZWZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2ODE0NzUsImV4cCI6MjA3MzI1NzQ3NX0.snNhBXEoCFd6TfJqH_BR-G0cDROF1fk9UDrz86x-3_E');
export default supabase;
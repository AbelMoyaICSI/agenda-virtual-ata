// ============================================================================
// EDGE FUNCTION: Eliminar Usuario de Supabase Auth
// Agenda Virtual ATA - I.E. 80002 Antonio Torres Araujo
// Esta función elimina un usuario de Supabase Auth usando service_role
// ============================================================================

import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, userId } = await req.json()
    
    console.log('🗑️ Solicitud de eliminación recibida:', { email, userId })

    if (!email && !userId) {
      return new Response(
        JSON.stringify({ error: 'Se requiere email o userId' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Crear cliente con service_role para poder eliminar usuarios
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    let authUserId = userId

    // Si solo tenemos email, buscar el userId en Auth
    if (email && !userId) {
      console.log('🔍 Buscando usuario por email:', email)
      
      // Listar usuarios y buscar por email
      const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers()
      
      if (listError) {
        console.error('❌ Error listando usuarios:', listError)
        throw listError
      }

      const authUser = users.find(u => u.email === email)
      
      if (!authUser) {
        console.log('⚠️ Usuario no encontrado en Auth, puede que ya esté eliminado')
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Usuario no existe en Auth (ya eliminado o nunca creado)',
            deleted: false 
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      authUserId = authUser.id
      console.log('✅ Usuario encontrado en Auth:', authUserId)
    }

    // Eliminar usuario de Auth
    console.log('🗑️ Eliminando usuario de Auth:', authUserId)
    
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(authUserId)

    if (deleteError) {
      console.error('❌ Error eliminando de Auth:', deleteError)
      throw deleteError
    }

    console.log('✅ Usuario eliminado de Auth exitosamente')

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Usuario eliminado de Auth correctamente',
        deleted: true,
        userId: authUserId
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('❌ Error en delete-auth-user:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Error interno del servidor',
        success: false 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

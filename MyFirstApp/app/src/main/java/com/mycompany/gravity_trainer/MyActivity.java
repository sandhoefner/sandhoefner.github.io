package com.mycompany.gravity_trainer;

import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;


public class MyActivity extends ActionBarActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_my);
        SharedPreferences sp = getSharedPreferences("bg", 0);
        String hexaColor = sp.getString("hexa", "#FFFFFF"); //default color will be #FFFFFF
        getWindow().getDecorView().setBackgroundColor(Color.parseColor(hexaColor));
    }
/*
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_my, menu);
        return true;
    }
*/

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    public final static String EXTRA_MESSAGE = "com.mycompany.myfirstapp.MESSAGE";

    /** Called when the user clicks the Send button */
    public void sendMessage(View view) {
        // Do something in response to button
        Intent intent = new Intent(this, Hangboards.class);
//        EditText editText = (EditText) findViewById(R.id.edit_message);
//        String message = editText.getText().toString();
//        String message_final = "Nice to meet you, " + message + "!";
//        intent.putExtra(EXTRA_MESSAGE, message_final);
        startActivity(intent);
    }
    public void sendMessageCampus(View view) {
        // Do something in response to button
        Intent intent = new Intent(this, Campusboards.class);
//        EditText editText = (EditText) findViewById(R.id.edit_message);
//        String message = editText.getText().toString();
//        String message_final = "Nice to meet you, " + message + "!";
//        intent.putExtra(EXTRA_MESSAGE, message_final);
        startActivity(intent);
    }


    public void sendMessageTimer(View view) {
        // Do something in response to button
        Intent intent = new Intent(this, Stopwatch.class);
//        EditText editText = (EditText) findViewById(R.id.edit_message);
//        String message = editText.getText().toString();
//        String message_final = "Nice to meet you, " + message + "!";
//        intent.putExtra(EXTRA_MESSAGE, message_final);
        startActivity(intent);
    }




    @Override
    protected void onResume() {
        super.onResume();
        SharedPreferences sp = getSharedPreferences("bg", 0);
        String hexaColor = sp.getString("hexa", "#FFFFFF"); //default color will be #FFFFFF
        getWindow().getDecorView().setBackgroundColor(Color.parseColor(hexaColor));
    }


    public void sendMessageSet(View view) {
        // Do something in response to button
        Intent intent = new Intent(this, Settings.class);
//        EditText editText = (EditText) findViewById(R.id.edit_message);
//        String message = editText.getText().toString();
//        String message_final = "Nice to meet you, " + message + "!";
//        intent.putExtra(EXTRA_MESSAGE, message_final);
        startActivity(intent);
    }

    public void sendMessageSport(View view) {
        // Do something in response to button
        Intent intent = new Intent(this, SportGrades.class);
//        EditText editText = (EditText) findViewById(R.id.edit_message);
//        String message = editText.getText().toString();
//        String message_final = "Nice to meet you, " + message + "!";
//        intent.putExtra(EXTRA_MESSAGE, message_final);
        startActivity(intent);
    }
}



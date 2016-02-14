package com.mycompany.gravity_trainer;

import android.app.Activity;
import android.os.Parcelable;
import android.support.v4.view.PagerAdapter;
import android.support.v4.view.ViewPager;
import android.view.View;
import android.view.ViewGroup.LayoutParams;
import android.widget.ImageView;
import android.widget.ImageView.ScaleType;

public class ViewPagerAdapter extends PagerAdapter {

    Activity activity;
    int imageArray[];

    public ViewPagerAdapter(Activity act, int[] imgArra) {
        imageArray = imgArra;
        activity = act;
    }

    public int getCount() {
        return imageArray.length;
    }

    public Object instantiateItem(View collection, int position) {
        ImageView view = new ImageView(activity);
        view.setLayoutParams(new LayoutParams(LayoutParams.FILL_PARENT,
                LayoutParams.FILL_PARENT));
        view.setScaleType(ScaleType.FIT_CENTER);
        view.setBackgroundResource(imageArray[position]);
        ((ViewPager) collection).addView(view, 0);
        return view;
    }

    @Override
    public void destroyItem(View arg0, int arg1, Object arg2) {
        ((ViewPager) arg0).removeView((View) arg2);
    }

    @Override
    public boolean isViewFromObject(View arg0, Object arg1) {
        return arg0 == ((View) arg1);
    }

    @Override
    public Parcelable saveState() {
        return null;
    }
}